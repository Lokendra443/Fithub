package com.lenncoder.fithub.mapper;

public interface MapperClass<E, D> {

    D toDto(E e);
    E toEntity(D d);
}
