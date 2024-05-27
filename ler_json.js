const fs = require('fs');

fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    console.log('Conteúdo do arquivo JSON:', jsonData);
  } catch (err) {
    console.error('Erro ao analisar o JSON:', err);
  }
});
