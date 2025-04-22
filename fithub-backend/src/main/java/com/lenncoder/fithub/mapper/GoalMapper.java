package com.lenncoder.fithub.mapper;

import com.lenncoder.fithub.dto.GoalDto;
import com.lenncoder.fithub.entity.Goal;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GoalMapper extends MapperClass<Goal, GoalDto> {

    GoalDto toDto(Goal e);
    Goal toEntity(GoalDto d);
}
