package com.lenncoder.fithub.payload.response;

import com.lenncoder.fithub.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

    private String token;
    private String message;
    private Role role;
}
