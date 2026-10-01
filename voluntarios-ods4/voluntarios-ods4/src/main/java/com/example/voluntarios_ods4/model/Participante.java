  @PutMapping("/{id}")
    public ResponseEntity<Participante> atualizar(@PathVariable Long id, @RequestBody Participante dadosAtualizados) {
        return repository.findById(id)
                .map(participanteExistente -> {
                    participanteExistente.setNome(dadosAtualizados.getNome());
                    participanteExistente.setCpf(dadosAtualizados.getCpf());
                    participanteExistente.setEmail(dadosAtualizados.getEmail());
                    participanteExistente.setDataNascimento(dadosAtualizados.getDataNascimento());
                    participanteExistente.setTelefone(dadosAtualizados.getTelefone());
                    participanteExistente.setPerfil(dadosAtualizados.getPerfil());
                    participanteExistente.setProjeto(dadosAtualizados.getProjeto());
                    
                    Participante participanteSalvo = repository.save(participanteExistente);
                    return ResponseEntity.ok(participanteSalvo);
                })
                .orElse(ResponseEntity.notFound().build());
    }
