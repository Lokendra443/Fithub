package com.lenncoder.fithub.config.user;

import com.lenncoder.fithub.entity.User;
import com.lenncoder.fithub.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepo.findByEmail(email);

        return user.map(CustomUserDetails::new).orElseThrow(() -> new com.lenncoder.fithub.exception.UsernameNotFoundException("User not found"));
    }
}
