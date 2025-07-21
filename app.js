document.addEventListener('DOMContentLoaded', () => {
  const btnGen = document.getElementById('generate');
  const btnShare = document.getElementById('share');
  const reportEl = document.getElementById('report');

  btnGen.addEventListener('click', () => {
    const caso = document.getElementById('caso').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const llamada = document.getElementById('llamada').value.trim();
    const hora = document.getElementById('hora').value.trim();
    const duracion = document.getElementById('duracion').value.trim();
    const relato = document.getElementById('relato').value.trim();

    if (!caso || !numero || !llamada || !hora || !duracion || !relato) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const text = 
`CASO: ${caso}
NRO.: ${numero}
LLAMADA: ${llamada}
HORA: ${hora}
DURACIÓN: ${duracion}"
RELATO:
${relato}`;

    reportEl.textContent = text;
    btnShare.hidden = false;
  });

  btnShare.addEventListener('click', () => {
    const mensaje = encodeURIComponent(reportEl.textContent);
    const url = `https://api.whatsapp.com/send?text=${mensaje}`;
    window.open(url, '_blank');
  });
});
