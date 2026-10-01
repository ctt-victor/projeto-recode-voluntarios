package com.example.voluntarios_ods4.controller;

import com.example.voluntarios_ods4.model.Participante;
import com.example.voluntarios_ods4.repository.ParticipanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Participante> salvar(@RequestBody Participante participante) {
        Participante novoParticipante = repository.save(participante);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoParticipante);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Participante> atualizar(@PathVariable Long id, @RequestBody Participante dadosAtualizados) {
        return repository.findById(id)
                .map(participanteExistente -> {
                    participanteExistente.setNome(dadosAtualizados.getNome());
                    participanteExistente.setEmail(dadosAtualizados.getEmail());
                    participanteExistente.setCpf(dadosAtualizados.getCpf());
                    participanteExistente.setTelefone(dadosAtualizados.getTelefone());
                    
                    Participante participanteSalvo = repository.save(participanteExistente);
                    return ResponseEntity.ok(participanteSalvo);
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
