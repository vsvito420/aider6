export default {
  async fetch(request, env) {
    if (request.method === 'POST' && new URL(request.url).pathname === '/generate') {
      const { prompt } = await request.json();

      // Initialize the AI model
      const ai = new env.AI();

      // Generate text using the Llama 2 model
      const response = await ai.run('@cf/meta/llama-2-7b-chat-fp16', {
        prompt: prompt,
        max_tokens: 256
      });

      return new Response(JSON.stringify({ generated_text: response.response }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Serve the HTML file for all other requests
    return new Response(await fetch('index.html'), {
      headers: { 'Content-Type': 'text/html' }
    });
  }
};
