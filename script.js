// Adiciona um ouvinte de evento que espera todo o conteúdo HTML da página ser carregado antes de executar o código JavaScript.
// Isso evita erros de tentar manipular elementos que ainda não existem na página.
document.addEventListener("DOMContentLoaded", () => {
  // --- INÍCIO: EFEITO MÁQUINA DE ESCREVER ---

  // Seleciona os elementos HTML que receberão o efeito.
  const h1 = document.querySelector(".hero-content .text-content h1");
  const p = document.querySelector(".hero-content .text-content .tech-stack");

  // Define os textos que serão "digitados".
  const h1Text = "Desenvolvedora de Software | Front-end";
  const pText = "HTML | CSS | JavaScript";
  const typingSpeed = 100; // Velocidade em milissegundos

  // Limpa o conteúdo original dos elementos para iniciar o efeito.
  h1.textContent = " ";
  p.textContent = " ";

  /**
   * Função que simula o efeito de máquina de escrever em um elemento HTML.
   * @param {HTMLElement} element - O elemento onde o texto será escrito.
   * @param {string} text - O texto a ser escrito.
   * @param {Function} [callback] - Uma função opcional a ser executada quando a digitação terminar.
   */
  function typeWriter(element, text, callback) {
    let i = 0; // Inicializa o contador de caracteres.
    element.textContent = ""; // Garante que o elemento esteja vazio.

    // Função interna que digita um caractere por vez.
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i); // Adiciona o próximo caractere.
        i++; // Incrementa o contador.
        setTimeout(type, typingSpeed); // Agenda a próxima chamada da função 'type' após 'typingSpeed' ms.
      } else if (callback) {
        callback(); // Se a digitação terminou e existe um callback, executa-o.
      }
    }
    type(); // Inicia o processo de digitação.
  }

  // Inicia a animação: primeiro digita o h1, e ao terminar (no callback), começa a digitar o p.
  typeWriter(h1, h1Text, () => typeWriter(p, pText));

  // --- FIM: EFEITO MÁQUINA DE ESCREVER ---

  // --- INÍCIO: LÓGICA DO CARROSSEL ---

  /**
   * Função reutilizável para configurar e controlar um carrossel.
   * @param {string} carouselId - O identificador único do carrossel (usado nos atributos 'data-').
   */
  function setupCarousel(carouselId) {
    // Seleciona os elementos essenciais do carrossel usando atributos 'data-'.
    const track = document.querySelector(
      `[data-carousel-track="${carouselId}"]`
    );
    const nextButton = document.querySelector(
      `.next-arrow[data-carousel="${carouselId}"]`
    );
    const prevButton = document.querySelector(
      `.prev-arrow[data-carousel="${carouselId}"]`
    );

    // 1. Garante que os elementos essenciais do carrossel existam antes de prosseguir.
    if (!track || !nextButton || !prevButton) return;

    const items = Array.from(track.children); // Pega todos os itens do carrossel.
    // 2. Garante que o carrossel tenha itens antes de continuar a configuração.
    if (items.length === 0) return;

    let currentIndex = 0; // Mantém o controle do slide atual.
    const itemWidth = items[0].getBoundingClientRect().width; // Calcula a largura de um item (incluindo padding/border).

    // Função para mover o 'track' (trilho) do carrossel.
    const setSlidePosition = (index) => {
      // Usa a propriedade CSS 'transform' para mover o trilho horizontalmente.
      track.style.transform = `translateX(-${itemWidth * index}px)`; // O valor negativo move para a esquerda.
    };

    // Evento de clique para o botão "próximo".
    nextButton.addEventListener("click", () => {
      currentIndex++;
      // Se chegar ao final, volta para o primeiro slide (efeito de loop).
      if (currentIndex > items.length - 1) {
        currentIndex = 0; // Volta para o início
      }
      setSlidePosition(currentIndex);
    });

    // Evento de clique para o botão "anterior".
    prevButton.addEventListener("click", () => {
      currentIndex--;
      // Se estiver no primeiro e clicar para voltar, vai para o último slide (efeito de loop).
      if (currentIndex < 0) {
        currentIndex = items.length - 1; // Vai para o final
      }
      setSlidePosition(currentIndex);
    });
  }

  // Inicializa os dois carrosséis presentes na página.
  setupCarousel("projetos");
  setupCarousel("certificacoes");

  // --- FIM: LÓGICA DO CARROSSEL ---
});
