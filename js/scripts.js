async function getInfo() {
  let cityNameInput = document.querySelector(".city-name").value;
  let resultDiv = document.querySelector(".result");
  let button = document.querySelector(".search-button");

  if (!cityNameInput.trim()) {
    resultDiv.innerHTML = "<p>Por favor, insira o nome de uma cidade.</p>";
    return;
  }

  let apiKeyOw = "15c8341a421b56d7aa571dbf88919816";
  let urlOw = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityNameInput)}&appid=${apiKeyOw}&units=metric&lang=pt_br`;

  let apiKeyGrok = "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";
  let urlGrok = "https://api.groq.com/openai/v1/chat/completions";

  const originalButtonContent = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<div class="spinner"></div>';
  resultDiv.innerHTML = "";

  try {
    let resultOw = await fetch(urlOw);
    let dataOw = await resultOw.json();

    if (dataOw.cod == "404" || dataOw.cod == 404) {
      throw new Error("Cidade não encontrada.");
    }

    let urlWiki = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(dataOw.name)}`;
    let resultWiki = await fetch(urlWiki);
    let dataWiki = await resultWiki.json();
    let context = dataWiki.extract || "";

    let promptSistema =
      "Você é um guia turístico. Responda em português do Brasil. Use estritamente os fatos fornecidos no contexto para descrever a cidade. Nunca invente dados. Se o contexto não tiver informações suficientes, diga que não há dados disponíveis.";
    let promptUsuario = context
      ? `Contexto real sobre ${dataOw.name}: "${context}". Descreva a cidade em até 50 palavras.`
      : `Descreva a cidade de ${dataOw.name} em até 50 palavras, usando apenas fatos seguros e gerais.`;

    let resultGrok = await fetch(urlGrok, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKeyGrok}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        temperature: 0.1,
        messages: [
          { role: "system", content: promptSistema },
          { role: "user", content: promptUsuario },
        ],
      }),
    });

    let dataGrok = await resultGrok.json();

    if (!resultGrok.ok) {
      throw new Error(
        `Falha na IA: ${dataGrok?.error?.message || resultGrok.status}`,
      );
    }

    resultDiv.innerHTML = `
      <h2>${dataOw.name}</h2>
      <p>Temperatura agora: <strong>${Math.floor(dataOw.main.temp)}°C</strong></p>
      <p>Condição atual: ${dataOw.weather[0].description}</p>
      <br/>
      <h3>Sobre a cidade:</h3>
      <p class="city-description">${dataGrok.choices[0].message.content}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>Erro: ${error.message}</p>`;
  } finally {
    button.disabled = false;
    button.innerHTML = originalButtonContent;
  }
}
