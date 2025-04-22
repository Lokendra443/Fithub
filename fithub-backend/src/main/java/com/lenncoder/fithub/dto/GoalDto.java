package com.lenncoder.fithub.dto;

import com.lenncoder.fithub.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GoalDto {

    private Long id;
    private String title;
    private String description;
    private Date targetDate;
    private Integer progress;
    private Status status;
    private Long userId;
}
