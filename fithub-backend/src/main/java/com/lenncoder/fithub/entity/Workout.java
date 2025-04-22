package com.lenncoder.fithub.entity;

import com.lenncoder.fithub.enums.Intensity;
import com.lenncoder.fithub.enums.WorkoutType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "workouts")
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private WorkoutType workoutType;

    @Enumerated(EnumType.STRING)
    private Intensity intensity;

    private Integer duration;

    private Integer caloriesBurned;

    private LocalDateTime createdAt;


    @Column(name = "user_id")
    private Long userId;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id", updatable = false, insertable = false, nullable = false)
    // Foreign key column in the workout table
    private User user;

    @OneToMany(mappedBy = "workouts", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Exercise> exercises;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }


}
