package com.example.voluntarios_ods4.controller;

import com.example.voluntarios_ods4.model.Projeto;
import com.example.voluntarios_ods4.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Projeto> salvar(@RequestBody Projeto projeto) {
        System.out.println("Recebendo projeto: " + projeto.getTitulo());
        Projeto novoProjeto = repository.save(projeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProjeto); // Retorna HTTP 201
    }

    @PutMapping("/{id}")
    public ResponseEntity<Projeto> atualizar(@PathVariable Long id, @RequestBody Projeto dadosAtualizados) {
        return repository.findById(id)
                .map(projetoExistente -> {
                    projetoExistente.setTitulo(dadosAtualizados.getTitulo());
                    projetoExistente.setDescricao(dadosAtualizados.getDescricao());
                    projetoExistente.setCpfCoordenador(dadosAtualizados.getCpfCoordenador());
                    projetoExistente.setEmail(dadosAtualizados.getEmail());
                    projetoExistente.setInstituicao(dadosAtualizados.getInstituicao());
                    projetoExistente.setVagasDisponiveis(dadosAtualizados.getVagasDisponiveis());
                    
                    Projeto projetoSalvo = repository.save(projetoExistente);
                    return ResponseEntity.ok(projetoSalvo);
                })
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
