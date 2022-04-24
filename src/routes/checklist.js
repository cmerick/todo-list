const express = require('express');

const router = express.Router();

const Checklist = require('../models/checklist');

router.get('/', async (req, res) => {
    try{
        let checklist = await Checklist.find();
        res.status(200).render('checklists/index', {Checklist: checklist});
    } catch (error) {
        res.status(422).render('pages/error/index', {error: 'Erro ao exibir as listas'});
    }
})

router.get('/new', async (req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render('checklists/new', {checklist: checklist});
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao carregar o formulário'});
    }
})

router.post('/', async (req, res) => {
    let {name} = req.body.checklist;
    let checklist = new Checklist({name});
    try{
        checklist = await Checklist.save();
        res.redirect('/checklist');
        
    } catch (error) {
        res.status(422).render('checklists/new', {checklist: {...checklist, error}});
    }
    
    
})

router.get('/:id', async (req, res) => {
    try{
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/show', {Checklist: checklist});
        
    } catch (error) {
        res.status(422).render('pages/error/index', {error: 'Erro ao exibir as listas'});
    }
})

router.put('/:id', async (req, res) => {
    try{
        let {name} = req.body;
        let checklist = await Checklist.findByIdAndUpdate(req.params.id, {name},{new: true});
        
        
    } catch (error) {
        res.status(422).json(error.message);
    }
})

router.delete('/:id', async (req, res) => {
    try{
        let checklist = await Checklist.findByIdAndDelete(req.params.id);
        
        
    } catch (error) {
        res.status(422).json(error.message);
    }
})


module.exports = router;