const espresso = require('express');
const meuServidor = espresso();
meuServidor.use(espresso.json());

// Consulta de todos os cargos:
const listaCargos = [
    {
        codigo: 1,
        nome: 'Desenvolvedor',
        descricao: 'Responsável pelo desenvolvimento de software.'
    },
    {
        codigo: 2,
        nome: 'Gerente de Projetos',
        descricao: 'Responsável pelo planejamento e execução de projetos.'
    }
];

meuServidor.get('/cargos', (requisicao, resposta) => {
    resposta.send(listaCargos);
});

const listaUsuarios = [
    {
        id: 1,
        nome: 'Leandro',
        idade: 15,
        CPF: '12345678911',
        codigoCargo: 1        // novo campo
    },
    {
        id: 2,
        nome: 'Pedro',
        idade: 16,
        CPF: '12335678911'
    }
    {
        id: 3,
        nome: 'João',
        idade: 55,
        CPF: '1111111111'
    }
];


meuServidor.get('/usuarios', (requisicao, resposta) => {
    let respostaUsuarios = '';
    for (let index = 0; index < listaUsuarios.length; index++) {
        const usuario = listaUsuarios[index];
        respostaUsuarios += '<p>';
        respostaUsuarios += 'Código: ';
        respostaUsuarios += usuario.id;
        respostaUsuarios += '</br>Nome: ';
        respostaUsuarios += usuario.nome;
        respostaUsuarios += '</br>Idade: ';
        respostaUsuarios += usuario.idade;
        respostaUsuarios += '</br>CPF: ';
        respostaUsuarios += usuario.CPF;
        respostaUsuarios += '</p>';
    }
    resposta.send(respostaUsuarios);
});

meuServidor.post('/usuarios', (requisicao, resposta) => {
    const nome = requisicao.body.nome;
    const idade = requisicao.body.idade;
    const cpf = requisicao.body.cpf;
    let codigo = -99999999999999999;
    for (let index = 0; index < listaUsuarios.length;index++) {
        const usuarioAtual = listaUsuarios[index];
        if (usuarioAtual.id > codigo) {
            codigo = usuarioAtual.id;
        }
    }
    if (codigo < 0) {
        codigo = 0;
    }
    const novoUsuario = {
        id: codigo + 1,
        nome: nome,
        idade: idade,
        CPF: cpf
    };
    listaUsuarios.push(novoUsuario);
    resposta.send();
});

meuServidor.put('/usuarios/:usuarioId', (requisicao, resposta) => {
    const codigoUsuario = requisicao.params.usuarioId;
    const usuarioEncontrado = listaUsuarios.find((usuarioAtual) => {
        return usuarioAtual.id == codigoUsuario;
    });
    const nome = requisicao.body.nome;
    const idade = requisicao.body.idade;
    const cpf = requisicao.body.cpf;
    usuarioEncontrado.nome = nome;
    usuarioEncontrado.idade = idade;
    usuarioEncontrado.CPF = cpf;  
    resposta.send();
});


// Atualização de um usuário pelo código do usuário:
meuServidor.put('/usuarios/:usuarioId', (requisicao, resposta) => {
    const codigoUsuario = requisicao.params.usuarioId;
    const usuarioEncontrado = listaUsuarios.find(usuario => usuario.id === parseInt(codigoUsuario));
    if (!usuarioEncontrado) {
        resposta.status(404).send('Usuário não encontrado');
        return;
    }
    usuarioEncontrado.nome = requisicao.body.nome;
    usuarioEncontrado.idade = requisicao.body.idade;
    usuarioEncontrado.CPF = requisicao.body.cpf;
    resposta.send('Usuário atualizado com sucesso');
});

// Remoção de um usuário pelo código do usuário:
meuServidor.delete('/usuarios/:usuarioId', (requisicao, resposta) => {
    const codigoUsuario = requisicao.params.usuarioId;
    const indiceUsuario = listaUsuarios.findIndex(usuario => usuario.id === parseInt(codigoUsuario));
    if (indiceUsuario === -1) {
        resposta.status(404).send('Usuário não encontrado');
        return;
    }
    listaUsuarios.splice(indiceUsuario, 1);
    resposta.send('Usuário removido com sucesso');
});

// Consulta de um usuário pelo código de usuário:
meuServidor.get('/usuarios/:usuarioId', (requisicao, resposta) => {
    const codigoUsuario = requisicao.params.usuarioId;
    const usuarioEncontrado = listaUsuarios.find(usuario => usuario.id === parseInt(codigoUsuario));
    if (!usuarioEncontrado) {
        resposta.status(404).send('Usuário não encontrado');
        return;
    }
    resposta.send(usuarioEncontrado);
});


// Cadastro de um cargo:
meuServidor.post('/cargos', (requisicao, resposta) => {
    const novoCargo = {
        codigo: listaCargos.length + 1,
        nome: requisicao.body.nome,
        descricao: requisicao.body.descricao
    };
    listaCargos.push(novoCargo);
    resposta.send('Cargo cadastrado com sucesso');
});

// Atualização de um cargo:
meuServidor.put('/cargos/:codigoCargo', (requisicao, resposta) => {
    const codigoCargo = requisicao.params.codigoCargo;
    const cargoEncontrado = listaCargos.find(cargo => cargo.codigo === parseInt(codigoCargo));
    if (!cargoEncontrado) {
        resposta.status(404).send('Cargo não encontrado');
        return;
    }
    cargoEncontrado.nome = requisicao.body.nome;
    cargoEncontrado.descricao = requisicao.body.descricao;
    resposta.send('Cargo atualizado com sucesso');
});

// Remoção de um cargo pelo código do cargo:
meuServidor.delete('/cargos/:codigoCargo', (requisicao, resposta) => {
    const codigoCargo = requisicao.params.codigoCargo;
    const indiceCargo = listaCargos.findIndex(cargo => cargo.codigo === parseInt(codigoCargo));
    if (indiceCargo === -1) {
        resposta.status(404).send('Cargo não encontrado');
        return;
    }
    listaCargos.splice(indiceCargo, 1);
    resposta.send('Cargo removido com sucesso');
});

// Consulta de um cargo pelo código de cargo:
meuServidor.get('/cargos/:codigoCargo', (requisicao, resposta) => {
    const codigoCargo = requisicao.params.codigoCargo;
    const cargoEncontrado = listaCargos.find(cargo => cargo.codigo === parseInt(codigoCargo));
    if (!cargoEncontrado) {
        resposta.status(404).send('Cargo não encontrado');
        return;
    }
    resposta.send(cargoEncontrado);
});



meuServidor.listen(4300, () => {
    console.log('Meu primeiro servidor na porta 4300.');
});