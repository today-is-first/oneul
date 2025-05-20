package store.oneul.mvc.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(basePackages = { "store.oneul.mvc.user.dao", "store.oneul.mvc.challenge.dao", "store.oneul.mvc.feed.dao", "store.oneul.mvc.chat.dao", "store.oneul.mvc.workoutLog.dao","store.oneul.mvc.payment.dao" })
public class DbConfig {

}
