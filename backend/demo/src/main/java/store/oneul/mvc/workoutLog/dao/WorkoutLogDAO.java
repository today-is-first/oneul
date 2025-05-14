package store.oneul.mvc.workoutLog.dao;

import org.apache.ibatis.annotations.Mapper;

import store.oneul.mvc.workoutLog.dto.WorkoutLogDTO;
import store.oneul.mvc.workoutLog.dto.WorkoutLogInsertRequestDTO;

@Mapper
public interface WorkoutLogDAO {
	void insertWorkoutLog(WorkoutLogInsertRequestDTO workoutLogInsertRequestDto);
}
