package dog.synergy.service;

import dog.synergy.repository.TaskRepository;
import dog.synergy.repository.UserRepository;
import dog.synergy.service.dto.StatisticDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public StatisticDto getAllStatistic(){
        return new StatisticDto(
            userRepository.getActivatedUsers(true),
            userRepository.getActivatedUsers(false),
            taskRepository.findAllTaskWhereBoardIsNotNull()
        );
    }

}
