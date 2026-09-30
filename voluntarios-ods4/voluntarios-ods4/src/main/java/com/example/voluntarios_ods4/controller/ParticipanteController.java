package com.example.voluntarios_ods4.controller;

import com.example.voluntarios_ods4.model.Participante;
import com.example.voluntarios_ods4.repository.ParticipanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/participantes")
@CrossOrigin(origins = "*")
public class ParticipanteController {

    @Autowired
    private ParticipanteRepository repository;

    @GetMapping
    public List<Participante> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Participante salvar(@RequestBody Participante participante) {
        return repository.save(participante);
    }

    @PutMapping("/{id}")
    public Participante atualizar(@PathVariable Long id, @RequestBody Participante participante) {
        participante.setId(id);
        return repository.save(participante);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repository.deleteById(id);
    }
}