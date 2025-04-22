package com.lenncoder.fithub.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Integer sets;
    private Integer repetitions;
    private Integer durationInMinutes;
    private String targetMuscle;
    private String equipment;
    private LocalDateTime createdAt;

    @Column(name = "workout_id")
    private Long workoutId;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workout_id", referencedColumnName = "id", insertable = false, updatable = false, nullable = false)
    private Workout workout;


    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }


}
