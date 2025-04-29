package com.lenncoder.fithub.repository;

import com.lenncoder.fithub.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {

    List<Post> findAllByUserId(Long userId);
}
