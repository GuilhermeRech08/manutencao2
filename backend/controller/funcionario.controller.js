
const cryptoJS = require('crypto-js');
const CHAVE_SECRETA = 'segredo';
const Funcionario = require('../models/Funcionario');

const cadastrar = async (req, res) => {
    const valores = req.body;

    if (!valores.nome || !valores.email || !valores.senha) {
        return res.status(400).json({
            message: 'Preencha todos os campos!'
        });
    }

    try {
        const senhaCripto = cryptoJS.AES.encrypt(
            valores.senha,
            CHAVE_SECRETA
        ).toString();

        await Funcionario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto
        });

        return res.status(201).json({
            message: 'Funcionário cadastrado com sucesso'
        });
    } catch (err) {
        console.error('Erro ao cadastrar', err);

        return res.status(500).json({
            message: 'Erro ao cadastrar funcionário'
        });
    }
};

const listar = async (req, res) => {
    try {
        const funcionarios = await Funcionario.findAll({
            attributes: ['idFuncionario', 'nome', 'email']
        });

        return res.status(200).json(funcionarios);
    } catch (err) {
        console.error('Erro ao listar funcionários', err);

        return res.status(500).json({
            message: 'Erro ao listar funcionários'
        });
    }
};

module.exports = { cadastrar, listar };
