package store.oneul.mvc.upload.config;

import org.springframework.context.annotation.Bean;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import org.springframework.context.annotation.Configuration;    
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Configuration
@Data
@RequiredArgsConstructor
public class S3Config {
    private final AwsProperties awsProperties;

    @Bean
    public S3Presigner s3Presigner() {
        return S3Presigner.builder()
                .region(Region.of(awsProperties.getRegion()))
                .credentialsProvider(StaticCredentialsProvider.create(
                    AwsBasicCredentials.create(awsProperties.getAccessKeyId(), awsProperties.getSecretAccessKey())
                ))
            .build();
    }
}