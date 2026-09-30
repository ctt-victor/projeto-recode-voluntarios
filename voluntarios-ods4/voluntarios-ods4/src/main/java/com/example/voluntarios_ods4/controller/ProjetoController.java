package com.example.voluntarios_ods4.controller;

import com.example.voluntarios_ods4.model.Projeto;
import com.example.voluntarios_ods4.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/projetos")
@CrossOrigin(origins = "*")
public class ProjetoController {

    @Autowired
    private ProjetoRepository repository;

    @GetMapping
    public List<Projeto> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Projeto salvar(@RequestBody Projeto projeto) {
        System.out.println("Recebendo projeto: " + projeto.getTitulo());
        return repository.save(projeto);
    }

    @PutMapping("/{id}")
    public Projeto atualizar(@PathVariable Long id, @RequestBody Projeto projeto) {
        projeto.setId(id);
        return repository.save(projeto);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repository.deleteById(id);
    }
}