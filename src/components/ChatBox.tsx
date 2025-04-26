import { useState } from 'react';

export const ChatBox = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error('Erro na requisição');

      const data = await res.json();
      setResponse(data.reply);
    } catch (err) {
      setResponse('Erro ao chamar a IA 😢');
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 mt-10">
      <p className="text-lg font-semibold text-gray-800">Fale com a IA e veja o que ela tem a dizer!</p>
      <span className="text-red-600 flex items-center gap-2">
        ⚠️ Estamos em construção!
      </span>

      <textarea
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite sua mensagem..."
      />

      <button
        className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        onClick={handleSend}
        disabled={loading}
      >
        {loading ? 'Pensando...' : 'Enviar'}
      </button>

      {response && (
        <div className="border-t pt-4 text-gray-700">
          <strong>Resposta:</strong>
          <p className="mt-2 whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
};
