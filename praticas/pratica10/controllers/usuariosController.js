const { cifrarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddleware');
const usuariosModel = require('../models/usuariosModel');

async function criar(req, res) {
    try {
        if (!req.body.email || !req.body.senha) {
            return res.status(422).json({ msg: 'Email e Senha são obrigatórios' });
        }

        const senhaCifrada = cifrarSenha(req.body.senha);
        const novoUsuario = await usuariosModel.create({
            email: req.body.email,
            senha: senhaCifrada
        });
        
        return res.status(201).json({
            _id: novoUsuario._id,
            email: novoUsuario.email
        });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return res.status(422).json({ msg: 'Email e Senha são obrigatórios' });
    }
}

async function entrar(req, res) {
    try {
        if (!req.body.usuario || !req.body.senha) {
            return res.status(401).json({ msg: 'Credenciais inválidas' });
        }

        const usuarioEncontrado = await usuariosModel.findOne({ 
            email: req.body.usuario 
        });

        if (usuarioEncontrado && compararSenha(req.body.senha, usuarioEncontrado.senha)) {
            const token = gerarToken({ email: req.body.usuario });
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ msg: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(401).json({ msg: 'Credenciais inválidas' });
    }
}

async function renovar(req, res) {
    try {
        const token = gerarToken({ email: req.usuario });
        return res.status(200).json({ token });
    } catch (error) {
        console.error('Erro ao renovar token:', error);
        return res.status(401).json({ msg: 'Token inválido' });
    }
}

async function remover(req, res) {
    try {
        const resultado = await usuariosModel.findOneAndDelete({ _id: req.params.id });
        
        if (!resultado) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }
        
        return res.status(204).send();
    } catch (error) {
        console.error('Erro ao remover usuário:', error);
        return res.status(404).json({ msg: 'Usuário não encontrado' });
    }
}

module.exports = { criar, entrar, renovar, remover };