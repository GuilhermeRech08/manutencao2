const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'
const Motorista = require('../models/Motorista')

const cadastrar = async(req,res) =>{
    const valores = req.body
    
    if(!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone){
        return res.status(400).json({message : "todos os campos devem ser preenchidos"})
    }

    try{
        const cnhCript = cryptoJS.AES.encrypt(valores.cnh, CHAVE_SECRETA ).toString()
        const cpfCript = cryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

        await Motorista.create({
            nome: valores.nome,
            cnh : cnhCript,
            cpf :  cpfCript,
            telefone: valores.telefone
        })

        return res.status(201).json({message : "Motorista cadastrado com sucesso!"})
    }catch(err){
        return res.status(500).json({message : "erro ao cadastrar motorista" })
    }
}
const listar = async(req,res)=>{
    const motoristas = await Motorista.findAll()
   
    try{
        const cnhDecrypt = cryptoJS.AES.decrypt(m.cnh, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
        const cpfDecrypt = cryptoJS.AES.decrypt(m.cpf, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
        
        const resultados = ({
            nome: motoristas.nome,
            cnh: cnhDecrypt,
            cpf: cpfDecrypt,
            telefone: motoristas.telefone
        })

        return res.status(200).json(resultados)
    }catch(err){
        return res.status(500).json({message : "erro ao listar motorista" })
    }
}
const consultar = async(req,res)=>{
    const id = req.params.id
    const motorista = await Motorista.findByPk(id)
    if(!motorista){
        return res.status(404).json({message : "motorista nao encontrado"})
    }

    try{
        const cnhDecrypt = cryptoJS.AES.decrypt(m.CNH, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
        const cpfDecrypt = cryptoJS.AES.decrypt(m.CPF, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
        return res.status(200).json({
            nome: motorista.nome,
            cnh: cnhDecrypt,
            cpf: cpfDecrypt,
            telefone: motorista.telefone
        })
    }catch(err){
        return res.status(500).json({message : "erro ao listar motorista" })
    }
}
const deletar = async(req,res)=>{
    const id = req.params.id
    const motorista = await Motorista.findByPk(id)
    if(!motorista){
        return res.status(404).json({message : "motorista nao encontrado"})
    }
        try{
            await Motorista.destroy({where : {codMotorista : id }})
            return res.status(200).json({ message: 'Cliente excluído com sucesso!' })
        } catch (err) {
            console.error('Erro ao apagar cliente:', err)
            return res.status(500).json({ message: 'Erro ao apagar cliente!' })
        }
}
module.exports = {cadastrar, listar, consultar, deletar}