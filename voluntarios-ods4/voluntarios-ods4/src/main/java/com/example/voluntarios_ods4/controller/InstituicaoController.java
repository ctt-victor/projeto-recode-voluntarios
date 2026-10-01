package com.example.voluntarios_ods4.controller;

import com.example.voluntarios_ods4.model.Instituicao;
import com.example.voluntarios_ods4.repository.InstituicaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Instituicao> salvar(@RequestBody Instituicao instituicao) {
        Instituicao novaInstituicao = repository.save(instituicao);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaInstituicao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Instituicao> atualizar(@PathVariable Long id, @RequestBody Instituicao dadosAtualizados) {
        return repository.findById(id)
                .map(instituicaoExistente -> {
                    instituicaoExistente.setNome(dadosAtualizados.getNome());
                    instituicaoExistente.setCnpj(dadosAtualizados.getCnpj());
                    instituicaoExistente.setEmail(dadosAtualizados.getEmail());
                    instituicaoExistente.setTelefone(dadosAtualizados.getTelefone());
                    
                    Instituicao instituicaoSalva = repository.save(instituicaoExistente);
                    return ResponseEntity.ok(instituicaoSalva);
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
