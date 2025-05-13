package store.oneul.mvc.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class SwaggerConfig {
	 @Bean
	  public OpenAPI springBoardOpenAPI() {
	      return new OpenAPI()
	              .info(new Info().title("Oneul API")
	              .description("Oneul REST API")
	              .version("v0.0.1")
	              .license(new License().name("ONEUL").url("https://www.oneul.com")));
	  }
}
