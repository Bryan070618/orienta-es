document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');

  form.addEventListener('submit', function (event) {
    // Corrigir e contar respostas
    const gabarito = {
      'pergunta 1': '1;3;5;7;11;13;17;19;23;29',
      'pergunta 2': 'não, pois é divisível por 7 e por 13 além de 1 e 91',
      'pergunta3': ['42'],
      'pergunta 4': 'y = x<sup>2</sup> + 2x - 4'
      'pergunta 5': 'Bryan'
    };

    const normalizeText = (text) =>
      text.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    let acertos = 0;
    let erros = 0;

    const p1 = document.querySelector('input[name="pergunta 1"]:checked');
    const p2 = document.querySelector('input[name="pergunta 2"]');
    const p3Selecionados = Array.from(document.querySelectorAll('input[name="pergunta3"]:checked')).map(el => el.value);
    const p4 = document.querySelector('input[name="pergunta 4"]:checked');
    const p5 = document.querySelector('input[name="pergunta 5"]:checked');

    if (p1 && p1.value === gabarito['pergunta 1']) acertos++; else erros++;

    if (p2 && normalizeText(p2.value) === normalizeText(gabarito['pergunta 2'])) acertos++; else erros++;

    if (p3Selecionados.length === gabarito['pergunta3'].length &&
        p3Selecionados.every(v => gabarito['pergunta3'].includes(v))) {
      acertos++;
    } else {
      erros++;
    }

    if (p4 && p4.value.replace(/\s+/g, '') === gabarito['pergunta 4'].replace(/\s+/g, '')) acertos++; else erros++;
    if (p5 && p5.value.replace(/\s+/g, '') === gabarito['pergunta 5'].replace(/\s+/g, '')) acertos++; else erros++;

    const resumo = `
      Pergunta 1: ${p1 ? p1.value : 'sem resposta'}
      Pergunta 2: ${p2 ? p2.value.trim() : 'sem resposta'}
      Pergunta 3: ${p3Selecionados.join(', ') || 'sem resposta'}
      Pergunta 4: ${p4 ? p4.value : 'sem resposta'}
      Pergunta 5: ${p5 ? p5.value : 'sem resposta'}
    `;

    document.getElementById('campoAcertos').value = acertos;
    document.getElementById('campoErros').value = erros;
    document.getElementById('campoResumo').value = resumo.trim();

    alert(`Você acertou ${acertos} e errou ${erros}. Enviando seu feedback...`);
  });
});
