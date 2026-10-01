package com.example.voluntarios_ods4.model;

import jakarta.persistence.*;

@Entity
@Table(name = "acoes_sociais")
public class Projeto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String titulo;
    
    @Column(columnDefinition = "TEXT")
    private String descricao;
    
    @Column(name = "cpf_coordenador", nullable = false)
    private String cpfCoordenador;
    
    @Column(nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String instituicao;
    
    @Column(name = "vagas_disponiveis", nullable = false)
    private Integer vagasDisponiveis;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    
    public String getCpfCoordenador() { return cpfCoordenador; }
    public void setCpfCoordenador(String cpfCoordenador) { this.cpfCoordenador = cpfCoordenador; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getInstituicao() { return instituicao; }
    public void setInstituicao(String instituicao) { this.instituicao = instituicao; }
    
    public Integer getVagasDisponiveis() { return vagasDisponiveis; }
    public void setVagasDisponiveis(Integer vagasDisponiveis) { this.vagasDisponiveis = vagasDisponiveis; }
}
