const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'
const Motorista = require('../models/Motorista')

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone) {
        return res.status(400).json({ message: "todos os campos devem ser preenchidos" })
    }

    try {
        const cnhCript = cryptoJS.AES.encrypt(valores.cnh, CHAVE_SECRETA).toString()
        const cpfCript = cryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

        await Motorista.create({
            nome: valores.nome,
            cnh: cnhCript,
            cpf: cpfCript,
            telefone: valores.telefone
        })

        return res.status(201).json({ message: "Motorista cadastrado com sucesso!" })
    } catch (err) {
        return res.status(500).json({ message: "erro ao cadastrar motorista" })
    }
}

const listar = async (req, res) => {
    try {
        const motoristas = await Motorista.findAll()
        motoristas.forEach(el => {
            el.cnh = cryptoJS.AES.decrypt(m.cnh, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
            el.cpf = cryptoJS.AES.decrypt(m.cpf, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
        });

        motoristas[el] = {
            ...motoristas,
            cnh: el.cnh,
            cpf: el.cpf
        }

        return res.status(200).json(motoristas)
    } catch (err) {
        return res.status(500).json({ message: "erro ao listar motorista" })
    }
}

const consultar = async (req, res) => {
    const nome = req.params.nome

    if (!nome) {
        return res.status(400).json({ message: 'Preencha todos os campos!' })
    }

    try {
        let motorista = await Motorista.findOne({ where: { nome: nome } })

        if (!motorista) {
            return res.status(404).json({ message: 'Não foi possível encontrar o motorista!' })
        }

        el.cnh = cryptoJS.AES.decrypt(m.cnh, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
        el.cpf = cryptoJS.AES.decrypt(m.cpf, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)


    } catch (err) {
        return res.status(500).json({ message: "erro ao consultar motorista" })
    }
}

const deletar = async (req, res) => {
    const id = req.params.id
    
    try {
        const motorista = await findByPk(id)
        if (!motorista) {
            return res.status(404).json({ message: "motorista nao encontrado" })
        }
        await motorista.destroy()

        res.status(200).json({message: 'Motorista apagado com'})
    } catch (err) {
        console.error('Erro ao apagar motorista:', err)
        return res.status(500).json({ message: 'Erro ao apagar motorista!' })
    }
}

const atualizar = async(req, res) => {
    let valores = req.body
    let id = req.params.id

    if (!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone) {
        return res.status(400).json({ message: "todos os campos devem ser preenchidos" })
    }

    try{
        const motorista = await findByPk(id)
        if(!motorista){
            return res.status(404).json({message: 'Motorista não encontrado!'})
        }

        await motorista.update({
            nome: valores.nome,
            cnh: valores.cnh,
            cpf: valores.cpf,
            telefone: valores.telefone
        })

        res.status(200).json(motorista)
    }catch(err){
        console.error('Erro ao atualizar motorista:', err)
        return res.status(500).json({ message: 'Erro ao atualizar motorista!' })
    }
}

module.exports = { cadastrar, listar, consultar, deletar, atualizar }