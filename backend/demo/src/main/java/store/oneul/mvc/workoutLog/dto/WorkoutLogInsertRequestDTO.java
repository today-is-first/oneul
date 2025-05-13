package store.oneul.mvc.workoutLog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data        
@Builder     
@NoArgsConstructor 
@AllArgsConstructor
public class WorkoutLogInsertRequestDTO {
	private Long userId;
	private Long challengeId;
	private Long feedId;
}
