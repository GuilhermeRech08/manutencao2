const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'
const Funcionario = require('../models/Funcionario')

const cadastrar = async(req, res) => {
    const valores = req.body

    if(!valores.nome || !valores.email || !valores.senha){
        return res.status(400).json({message: 'Preencha todos os campos!'})
    }

    try{
        let senhaCripto = cryptoJS.AES.encrypt(senha, 'senha').toString()
        Funcionario.create({
            nome,
            email,
            senha: senhaCripto
        })
        res.status(201).json({message: 'funcionario cadastrado com sucesso'})
    }catch(err){
        console.error('erro ao cadastrar', err)
        res.status(500).json({message: 'erro ao cadastrar'})
    }
}

const listar = async(req, res) => {
    try{
        const senhaDecrypt = cryptoJS.AES.decrypt(funcionario.senha, CHAVE_SECRETA).toString()

        const resultados = ({
            nome: funcionario.nome,
            email: funcionario.email,
            senha: senhaDecrypt
        })

        return res.status(200).json(resultados)
    }catch(err){
        return res.status(500).json({message: 'Erro ao listar funcionarios'})
    }
}

module.exports = {cadastrar, listar}