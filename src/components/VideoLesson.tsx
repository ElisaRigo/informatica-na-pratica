<!-- ====== INÍCIO: Seção de Vídeo Bunny ====== -->
<section class="video-section">
  <div class="video-container">
    <!-- Cabeçalho -->
    <div class="video-header">
      <h2>Veja na prática como é fácil aprender comigo 💙</h2>
      <p>
        Assista à aula gratuita e sinta como é simples dominar informática de forma prática.
        É rapidinho e direto ao ponto!
      </p>
    </div>

    <!-- Cartão do Vídeo -->
    <div class="video-card">
      <div class="video-frame">
        <iframe
          id="bunnyPlayer"
          src="https://iframe.mediadelivery.net/embed/492757/38d0f06a-a739-470f-9211-8e918933578a?autoplay=1&loop=0&muted=1&preload=1&responsive=1"
          loading="lazy"
          style="border:0;position:absolute;inset:0;width:100%;height:100%;"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          referrerpolicy="strict-origin-when-cross-origin"
          title="Aula gratuita - Informática na Prática">
        </iframe>

        <!-- Sobreposição: Ativar som -->
        <button class="sound-overlay" id="soundOverlay" aria-label="Ativar som e tocar vídeo">
          <span class="sound-btn">🔊 Ativar som</span>
        </button>
      </div>
    </div>

    <!-- Texto/CTA abaixo do vídeo -->
    <div class="video-cta">
      <p>
        <strong>Nesta aula:</strong> você aprende a salvar arquivos no Word do jeito certo —
        uma habilidade essencial que trabalhamos no curso completo.
      </p>
      <!-- Exemplo de CTA opcional:
      <a href="https://api.whatsapp.com/send?phone=55XXXXXXXXXXX&text=Quero%20saber%20mais%20sobre%20o%20curso%20%F0%9F%92%99"
         class="cta-btn">💬 Falar no WhatsApp</a>
      -->
    </div>
  </div>
</section>

<style>
  /* ====== Estilos da Seção ====== */
  .video-section {
    padding: 56px 0 72px;
    background: linear-gradient(180deg, var(--bg1, #0b0d12) 0%, rgba(0,0,0,0.25) 100%);
  }
  .video-container {
    max-width: 1040px;
    margin: 0 auto;
    padding: 0 16px;
  }
  .video-header {
    text-align: center;
    margin-bottom: 28px;
  }
  .video-header h2 {
    margin: 0 0 10px;
    font-size: clamp(28px, 4vw, 44px);
    line-height: 1.15;
    font-weight: 900;
    color: var(--title, #ffffff);
    letter-spacing: -0.02em;
  }
  .video-header p {
    margin: 0 auto;
    max-width: 760px;
    font-size: clamp(16px, 2.4vw, 20px);
    line-height: 1.6;
    color: var(--muted, #cdd4df);
  }

  /* Cartão do vídeo */
  .video-card {
    border-radius: 22px;
    border: 3px solid rgba(0, 170, 255, 0.22);
    box-shadow:
      0 22px 60px rgba(0, 0, 0, 0.45),
      0 2px 0 rgba(255,255,255,0.04) inset;
    overflow: hidden; /* faz o border-radius funcionar no iframe */
    background:
      radial-gradient(1200px 400px at 50% -20%, rgba(0,170,255,0.12), transparent 70%),
      linear-gradient(180deg, rgba(0,0,0,0.32), rgba(0,0,0,0.24));
  }

  .video-frame {
    position: relative;
    padding-top: 56.25%; /* 16:9 */
    border-radius: 20px;
  }

  /* Botão/overlay para ativar som */
  .sound-overlay {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background: linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.35));
    border: 0;
    cursor: pointer;
    transition: opacity 180ms ease;
  }
  .sound-overlay.hide { opacity: 0; pointer-events: none; }

  .sound-btn {
    display: inline-block;
    padding: 14px 22px;
    border-radius: 16px;
    background: rgba(0, 140, 255, 0.92);
    color: #fff;
    font-weight: 800;
    font-size: clamp(14px, 2.2vw, 18px);
    letter-spacing: 0.3px;
    box-shadow:
      0 10px 30px rgba(0,140,255,0.45),
      0 0 0 6px rgba(0,140,255,0.18);
    transform: translateZ(0);
    transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
  }
  .sound-overlay:hover .sound-btn {
    transform: translateY(-1px);
    box-shadow:
      0 16px 44px rgba(0,140,255,0.5),
      0 0 0 7px rgba(0,140,255,0.2);
  }

  /* CTA abaixo */
  .video-cta {
    text-align: center;
    margin-top: 28px;
    color: var(--muted, #cdd4df);
    font-size: clamp(15px, 2.2vw, 19px);
  }
  .video-cta strong { color: var(--title, #fff); }

  .cta-btn {
    display: inline-block;
    margin-top: 14px;
    padding: 12px 18px;
    border-radius: 999px;
    background: #25d366;
    color: #0e2116;
    font-weight: 800;
    text-decoration: none;
    box-shadow: 0 10px 24px rgba(37,211,102,0.35);
  }

  /* Ajustes menores em telas muito pequenas */
  @media (max-width: 420px) {
    .sound-btn { padding: 12px 18px; border-radius: 14px; }
    .video-section { padding: 44px 0 60px; }
  }
</style>

<script>
  // ====== Parâmetros (mude aqui se quiser outro comportamento) ======
  const AUTOPLAY_DEFAULT = 1; // 1 = inicia tocando (muted), 0 = inicia pausado
  const MUTED_DEFAULT = 1;    // 1 = mudo (recomendado para autoplay), 0 = com som

  (function () {
    const iframe = document.getElementById('bunnyPlayer');
    const overlay = document.getElementById('soundOverlay');

    // Garante que o src inicial está conforme os parâmetros
    try {
      const u = new URL(iframe.src);
      u.searchParams.set('autoplay', String(AUTOPLAY_DEFAULT));
      u.searchParams.set('muted', String(MUTED_DEFAULT));
      u.searchParams.set('loop', '0');
      u.searchParams.set('preload', '1');
      u.searchParams.set('responsive', '1');
      iframe.src = u.toString();
    } catch (e) { /* silencioso se URL inválida */ }

    // Clique em "Ativar som" => recarrega com som e autoplay
    overlay.addEventListener('click', () => {
      try {
        const url = new URL(iframe.src);
        url.searchParams.set('muted', '0');
        url.searchParams.set('autoplay', '1');
        iframe.src = url.toString();
      } catch (e) { /* ignore */ }
      overlay.classList.add('hide');
    });

    // Se você quiser que o overlay desapareça sozinho quando AUTOPLAY_DEFAULT=1,
    // mantenha-o visível (usuário pode optar por ativar som depois).
    // Se quiser ocultar imediatamente, descomente abaixo:
    // if (AUTOPLAY_DEFAULT === 1) overlay.classList.add('hide');
  })();
</script>
<!-- ====== FIM: Seção de Vídeo Bunny ====== -->

