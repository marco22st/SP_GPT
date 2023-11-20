package at.htlle.cheatgpt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class CheatgptApplication {

    public static void main(String[] args) {
        SpringApplication.run(CheatgptApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                System.out.println("Setting CORS Mapping ...");
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:8080") // Hier die Origin Ihres Clients angeben
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("Content-Type");
            }
        };
    }
}
