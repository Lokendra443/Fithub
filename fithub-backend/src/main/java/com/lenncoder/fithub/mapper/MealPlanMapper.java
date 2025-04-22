package com.lenncoder.fithub.mapper;

import com.lenncoder.fithub.dto.MealPlanDto;
import com.lenncoder.fithub.entity.MealPlan;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MealPlanMapper extends MapperClass<MealPlan, MealPlanDto>{

    MealPlanDto toDto(MealPlan e);
    MealPlan toEntity(MealPlanDto d);
}
