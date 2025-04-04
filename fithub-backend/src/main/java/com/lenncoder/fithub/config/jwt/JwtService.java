package com.lenncoder.fithub.config.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);
    private static final org.slf4j.Logger log = LoggerFactory.getLogger(JwtService.class);

    @Value("${security.jwt.secret}")
    private String secretKey;
    @Value("${security.jwt.expirationTime}")
    private Long jwtExpiration;


    // Generate token with given user name
    public String generateJwtToken(String userName, String role) {
        // Prepare claims for the token
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "ROLE_" + role);// Add role with 'ROLE_' prefix

        // Build JWT token with claims, subject, issued time, expiration time, and signing algorithm
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }


    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

    public String getUserNameFromToken(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(token);
            return true;
        } catch (MalformedJwtException e) {

            logger.error("Invalid jwt token : {} ", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("Expired token : {} ", e.getMessage());

        } catch (UnsupportedJwtException e) {
            logger.error("This token is not supported : {} ", e.getMessage());


        } catch (IllegalArgumentException e) {
            logger.error("No claims found : {} ", e.getMessage());


        }
        return false;
    }


}
