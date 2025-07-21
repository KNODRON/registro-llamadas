document.addEventListener('DOMContentLoaded', () => {
  const btnGen = document.getElementById('generate');
  const fields = ['caso','numero','llamada','hora','duracion'];

  // máscara básica para HH:MM:SS
  function formatHMSS(e) {
    let v = e.target.value.replace(/\D/g, '').slice(0,6);
    if (v.length <= 2) {
      e.target.value = v;
    } else if (v.length <= 4) {
      e.target.value = v.slice(0,2) + ':' + v.slice(2);
    } else {
      e.target.value =
        v.slice(0,2) +
        ':' +
        v.slice(2,4) +
        ':' +
        v.slice(4);
    }
  }

  // asignar máscara a hora y duración
  ['hora','duracion'].forEach(id => {
    document.getElementById(id)
      .addEventListener('input', formatHMSS);
  });

  btnGen.addEventListener('click', () => {
    const vals = {};
    for (let id of fields) {
      vals[id] = document.getElementById(id).value.trim();
      if (!vals[id]) {
        alert('Completa el campo ' + id.toUpperCase());
        return;
      }
    }

    // montar texto
    const text =
`CASO: ${vals.caso}
NRO.: ${vals.numero}
LLAMADA: ${vals.llamada}
HORA: ${vals.hora} hrs
DURACIÓN: ${vals.duracion}
RELATO:
${/* no hay campo relato, asumimos que el usuario incluye todo en CASO o en LLAMADA? 
   Si necesitas RELATO, agrégalo como textarea y aquí vals.relato */''}`;

    // enviar directo a WhatsApp
    const mensaje = encodeURIComponent(text);
    const url = `https://api.whatsapp.com/send?text=${mensaje}`;
    window.open(url, '_blank');
  });
});
