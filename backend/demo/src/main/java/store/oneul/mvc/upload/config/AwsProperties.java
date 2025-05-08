package store.oneul.mvc.upload.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "aws")
public class AwsProperties {
    private String accessKeyId;
    private String secretAccessKey;
    private String region;
    private String bucketName;
}
