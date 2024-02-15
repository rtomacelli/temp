const express = require('express');
const { suportedb } =  require('../../mongo/mongosuporte')
const { ObjectId } = require('mongodb');

const router = express.Router();

// Endpoint POST para /config
router.post('/', async (req, res) => {
  console.log(`${new Date(Date.now()).toISOString()} - POST Config - ENTRADA`)
  if((Object.keys(req.body).length == 0) || (req.body == undefined)) {
    console.log(`${new Date(Date.now()).toISOString()} - POST Config - Erro: sem body.`)
    res.status(400).send('Sem body presente.');
    return;
  }

  // Verifica se o Project ID OU a equipe_gsti foi especificado
  const is_sigla_present = req.query.sigla || req.body.sigla ? true : false;
  const is_time_present = req.query.label_time || req.body.label_time ? true : false;
  const is_ldap_present = req.query.papeis_ldap || req.body.papeis_ldap ? true : false;

  if(!is_sigla_present || !is_time_present || !is_ldap_present) {
    console.log(`${new Date(Date.now()).toISOString()} - POST Config - Bad Request: É necessário especificar a sigla, o label do time e os papeis LDAP.`);
    res.status(400).send(`Bad Request: É necessário especificar a sigla, o label do time e os papeis LDAP.`);
    return;    
  }

  // Verifica a existencia de um config. Se existir, deverá ser atualizado pelo PUT.
  const is_config_exists = await suportedb.collection('config').findOne({
    sigla: req.query.sigla ? req.query.sigla : req.body.sigla,
    label_time: req.query.label_time ? req.query.label_time : req.body.label_time
  });
  if (is_config_exists) {
    console.log(`${new Date(Date.now()).toISOString()} - POST Config - Conflito: Config com os dados ${req.query.sigla ? `${req.query.sigla}, ` : ''}${req.query.equipe_gsti ? `${req.query.equipe_gsti}, ` : ''}${req.query.label_time ? `${req.query.label_time}` : ''} já existe. Use o PUT para atualizações.`);
    res.status(409).send(`Conflito: Config com os dados ${req.query.sigla}, ${req.query.equipe_gsti}, ${req.query.label_time} já existe. Use o PUT para atualizações.`);
    return;
  }

  const is_projectid_present = req.query.project_id || req.body.project_id ? true : false;
  const is_equipegsti_present = req.query.equipe_gsti || req.body.equipe_gsti ? true : false;

  if(!is_projectid_present && !is_equipegsti_present) {
    console.log(`${new Date(Date.now()).toISOString()} - POST Config - Bad Request: É necessário que project ID ou equipe GSTI estejam presentes.`);
    res.status(400).send(`Bad Request: É necessário que project ID ou equipe GSTI estejam presentes.`);
    return;    
  }

  const config = {
    ...req.body,
    sigla: req.query.sigla ? req.query.sigla : req.body.sigla ,
    label_time: req.query.label_time ? req.query.label_time : req.body.label_time ,
    project_id: req.query.project_id ? `${req.query.project_id}` : req.body.project_id ? `${req.body.project_id}` : '',
    equipe_gsti: req.query.equipe_gsti ? `${req.query.equipe_gsti}` : req.body.equipe_gsti ? `${req.body.equipe_gsti}` : '',
    timestamp: new Date(Date.now()),
  };

  suportedb.collection('config').insertOne(config)
  .then(result => {
    if (result.insertedId) {
      console.log(`${new Date(Date.now()).toISOString()} - POST Config - Item inserido com sucesso com o id ${result.insertedId}`);
      res.status(201).send(`Config com ID ${result.insertedId} criado com sucesso.`);
    } else {
      console.log(`${new Date(Date.now()).toISOString()} - POST Config - Falha ao inserir o item ${result.insertedId}`);
      res.status(500).send('Erro interno do servidor');
    }
  })
  .catch(error => {
    console.log(`${new Date(Date.now()).toISOString()} - POST Config - Ocorreu um erro: ${error}`);
    res.status(500).send('Erro interno do servidor');
  });
});

// Endpoint PUT para /config
router.put('/:_id', async (req, res) => {
  const objectId = ObjectId(req.params._id);
  console.log(`${new Date(Date.now()).toISOString()} - PUT Config - ENTRADA`)
  if((Object.keys(req.body).length == 0) || (req.body == undefined)) {
    console.log(`${new Date(Date.now()).toISOString()} - PUT Config - Erro: sem body.`)
    res.status(400).send('Sem body presente.');
    return;
  }
  const config = {
    ...req.body,
    timestamp: new Date(Date.now()),
  };

  const updateResult = await suportedb.collection('config').updateOne({_id: objectId }, { $set: config }, { upsert: true });

  console.log(`${new Date(Date.now()).toISOString()} - PUT Config - SAIDA`)
  if (updateResult.matchedCount === 0) {
    res.status(201).send(`Config com ID ${req.params._id} criado com sucesso.`);
  } else {
    res.status(200).send(`Config com ID ${req.params._id} atualizado com sucesso.`);
  }
});

// Endpoint GET para /config
router.get('/', async (req, res) => {
  console.log(`${new Date(Date.now()).toISOString()} - GET Config - ENTRADA`)
  let query = {
    ...req.query
  }
  const response = await suportedb.collection('config').find(query).toArray();
  console.log(`${new Date(Date.now()).toISOString()} - GET Config - SAIDA`)
  res.send(response);
});

// Endpoint DELETE para /config
router.delete('/:_id', async (req, res) => {
  try {
    const objectId = ObjectId(req.params._id);
    console.log(`${new Date(Date.now()).toISOString()} - DELETE config - ENTRADA`);
    const deleteResult = await suportedb.collection('config').deleteOne({ _id: objectId });
    if (deleteResult.deletedCount === 0) {
      console.log(`${new Date(Date.now()).toISOString()} - DELETE config - Erro: Config com ID ${req.params._id} não existe.`);
      res.status(404).send(`Config com ID ${req.params._id} não existe.`);
    } else {
      console.log(`${new Date(Date.now()).toISOString()} - DELETE config - SAIDA`);
      res.status(200).send(`Config com ID ${req.params._id} deletado com sucesso.`);
    }
  } catch (error) {
    console.error(`${new Date(Date.now()).toISOString()} - DELETE config - Erro:`, error);
    res.status(500).send('Ocorreu um erro ao processar a solicitação.');
  }
});


module.exports = router;
