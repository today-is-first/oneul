package store.oneul.mvc.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(basePackages = "store.oneul.mvc.user.dao")
public class DbConfig {

}
