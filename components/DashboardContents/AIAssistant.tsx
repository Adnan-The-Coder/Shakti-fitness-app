import { useState, FormEvent } from "react";

export default function AI_Assistant() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: 'ai', text: 'Welcome to the chat! How can I assist you today?' }
  ]);
  const [userInput, setUserInput] = useState('');

  const generateText = async (userMessage: string) => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: userMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'user', text: userMessage },
          { sender: 'ai', text: data.output },
        ]);
      } else {
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'user', text: userMessage },
          { sender: 'ai', text: data.error },
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'ai', text: 'An error occurred. Please try again.' },
      ]);
    }
  };

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (userInput.trim() !== '') {
      generateText(userInput);
      setUserInput('');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-gray-100">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-orange-600">Shakti AI Assistant</h1>
        <p className="text-sm text-gray-500">Powered by Gemini</p>
      </div>
      <div className="z-10 max-w-xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-orange-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex border-t border-gray-300">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-4 border-none outline-none"
          />
          <button type="submit" className="p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
