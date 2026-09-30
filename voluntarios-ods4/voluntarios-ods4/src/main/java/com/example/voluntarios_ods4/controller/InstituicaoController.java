package com.example.voluntarios_ods4.controller;

import com.example.voluntarios_ods4.model.Instituicao;
import com.example.voluntarios_ods4.repository.InstituicaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/instituicoes")
@CrossOrigin(origins = "*")
public class InstituicaoController {

    @Autowired
    private InstituicaoRepository repository;

    @GetMapping
    public List<Instituicao> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Instituicao salvar(@RequestBody Instituicao instituicao) {
        return repository.save(instituicao);
    }

    @PutMapping("/{id}")
    public Instituicao atualizar(@PathVariable Long id, @RequestBody Instituicao instituicao) {
        instituicao.setId(id);
        return repository.save(instituicao);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repository.deleteById(id);
    }
}