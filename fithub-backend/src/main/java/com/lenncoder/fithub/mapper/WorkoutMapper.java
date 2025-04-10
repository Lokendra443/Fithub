package com.lenncoder.fithub.mapper;

import com.lenncoder.fithub.dto.WorkoutDto;
import com.lenncoder.fithub.entity.Workout;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface WorkoutMapper extends MapperClass<Workout, WorkoutDto>{

    WorkoutDto toDto(Workout e);
    Workout toEntity(WorkoutDto d);
}
