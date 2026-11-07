<div align="center">

# 🌤️ Weather & AI City Insights

**Uma aplicação web que combina dados meteorológicos em tempo real com Inteligência Artificial para gerar descrições precisas e humanizadas de cidades.**

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![OpenWeather](https://img.shields.io/badge/OpenWeather-FFD700?style=for-the-badge&logo=openweathermap&logoColor=black)](https://openweathermap.org/)
[![Wikipedia](https://img.shields.io/badge/Wikipedia-000000?style=for-the-badge&logo=wikipedia&logoColor=white)](https://www.wikipedia.org/)
[![Groq](https://img.shields.io/badge/Groq_LLM-F55036?style=for-the-badge&logo=openai&logoColor=white)](https://groq.com/)

</div>

---

## 💡 O Diferencial (Por que este projeto é especial?)

Durante o desenvolvimento, notei que ao pedir para uma IA (LLM) descrever cidades pequenas, ela frequentemente **alucinava** (inventava dados econômicos, populacionais e geográficos). 

Para resolver esse problema e garantir a precisão das informações, implementei uma arquitetura de **RAG (Retrieval-Augmented Generation)**. O fluxo funciona assim:

1. O clima é buscado na **OpenWeather API**.
2. O contexto histórico e geográfico real é extraído da **Wikipedia API**.
3. A **Groq API (LLM)** recebe o texto da Wikipédia e atua apenas como um "redator", resumindo os fatos reais em até 50 palavras com um tom de guia turístico.

**O resultado?** Descrições humanizadas, agradáveis de ler e **100% livres de informações falsas**. Um verdadeiro exemplo de engenharia de prompt aplicada!

## 🚀 Funcionalidades

- 🌡️ Busca de clima em tempo real (temperatura e condição atual).
- 🤖 Geração de texto via IA (Modelo `openai/gpt-oss-120b` via Groq).
- 🛡️ Prevenção de alucinações usando dados verificados da Wikipédia (RAG).
- ⏳ Interface com estados de carregamento (Spinner animado no botão durante a busca).
- 🚨 Tratamento de erros amigável (cidade não encontrada, falhas de API, etc).
- 🎨 Separação de responsabilidades (HTML puramente semântico, pronto para receber CSS externo).

## ⚙️ Como executar o projeto localmente

1. Clone este repositório no seu terminal: `git clone https://github.com/leolop3sdev520/info-cities/`

2. Abra o arquivo `index.html` no seu navegador (ou utilize a extensão Live Server no VS Code).

3. No arquivo `script.js`, insira as suas próprias chaves de API nas variáveis:
   - `apiKeyOw`: Crie uma conta gratuita em [OpenWeatherMap](https://openweathermap.org/).
   - `apiKeyGrok`: Crie uma conta gratuita em [Groq Console](https://console.groq.com/).

## 🔒 Nota de Segurança

Este é um projeto front-end com fins educacionais e de portfólio. Em um ambiente de produção real, as chaves de API **nunca** devem ser expostas no lado do cliente (navegador). A recomendação é criar um back-end (ex: Node.js) atuando como proxy para proteger essas credenciais.

---

<div align="center">
Feito com 💻 e ☕ por <a https://github.com/leolop3sdev520/">Leo Lopes</a>
</div>
