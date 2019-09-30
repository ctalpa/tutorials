package it.alamaviva.tutorial.service;

import it.alamaviva.tutorial.service.dto.ContactTypeDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link it.alamaviva.tutorial.domain.ContactType}.
 */
public interface ContactTypeService {

    /**
     * Save a contactType.
     *
     * @param contactTypeDTO the entity to save.
     * @return the persisted entity.
     */
    ContactTypeDTO save(ContactTypeDTO contactTypeDTO);

    /**
     * Get all the contactTypes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ContactTypeDTO> findAll(Pageable pageable);


    /**
     * Get the "id" contactType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ContactTypeDTO> findOne(Long id);

    /**
     * Delete the "id" contactType.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
