package com.example.backend.config;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    private static final String secret_key="3ef1272a38c38740e4c26e3762bb4a4900beac44aa6ba23352eab853b4c659796086a7809b559f3279442c1f510d9ea667ff61722206f7487b14314a51bf20bbd9a891e3e55fc075069310c21ae9915a8c0d67c93221f2d8d3b3579575ab4f394d6e83ea6472b5730b3eacdc735e76f4629a4b1fccbdfc7d458000097a06ff5a4cef4249c127f6ca151e6884609d3281045bab3537fb7b4e3734509b578ebcba1ab9171e405eaf200558553f98fed9613a641c99f80dd2efd9a88f16d3e05734f9c622a86e18888e41d34f2f5b77325e5826e8be9020f03441675da616581621608ce8b74de3d6c2404f392be26271971f0784db998d1243c35412b25751d9aa";
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 1000*60*24))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
    }
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    private boolean isTokenExpired(String token) {
        return extractDate(token).before(new Date());
    }
    private Date extractDate(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret_key);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
