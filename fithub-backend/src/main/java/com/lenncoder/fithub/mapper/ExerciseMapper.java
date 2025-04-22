package com.lenncoder.fithub.mapper;

import com.lenncoder.fithub.dto.ExerciseDto;
import com.lenncoder.fithub.entity.Exercise;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ExerciseMapper extends MapperClass<Exercise, ExerciseDto> {

    ExerciseDto toDto(Exercise e);

    Exercise toEntity(ExerciseDto d);

}
