// // import org.springframework.context.annotation.Bean;
// // import org.springframework.context.annotation.Configuration;
// // import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// // import org.springframework.security.core.userdetails.User;
// // import org.springframework.security.core.userdetails.UserDetails;
// // import org.springframework.security.core.userdetails.UserDetailsService;
// // import org.springframework.security.provisioning.InMemoryUserDetailsManager;
// // import org.springframework.security.web.SecurityFilterChain;
// // import static org.springframework.security.config.Customizer.withDefaults;


// // @Configuration
// // public class SecurityConfig {

// //     @Bean
// //     public UserDetailsService userDetailsService() {
// //         UserDetails superUser = User.withDefaultPasswordEncoder()
// //             .username("admin")
// //             .password("1234")
// //             .roles("ADMIN")
// //             .build();

// //         return new InMemoryUserDetailsManager(superUser);
// //     }

// //     @Bean
// //     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
// //         http
// //             .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
// //             .formLogin(withDefaults())
// //             .httpBasic(withDefaults());
// //         return http.build();
// //     }
// // }
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf(csrf -> csrf.disable())
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/**").permitAll()
//             )
//             .formLogin(login -> login.disable())
//             .httpBasic(httpBasic -> httpBasic.disable());
//         return http.build();
//     }
// }
