package it.alamaviva.tutorial.service.impl;

import it.alamaviva.tutorial.service.ContactTypeService;
import it.alamaviva.tutorial.domain.ContactType;
import it.alamaviva.tutorial.repository.ContactTypeRepository;
import it.alamaviva.tutorial.service.dto.ContactTypeDTO;
import it.alamaviva.tutorial.service.mapper.ContactTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ContactType}.
 */
@Service
@Transactional
public class ContactTypeServiceImpl implements ContactTypeService {

    private final Logger log = LoggerFactory.getLogger(ContactTypeServiceImpl.class);

    private final ContactTypeRepository contactTypeRepository;

    private final ContactTypeMapper contactTypeMapper;

    public ContactTypeServiceImpl(ContactTypeRepository contactTypeRepository, ContactTypeMapper contactTypeMapper) {
        this.contactTypeRepository = contactTypeRepository;
        this.contactTypeMapper = contactTypeMapper;
    }

    /**
     * Save a contactType.
     *
     * @param contactTypeDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ContactTypeDTO save(ContactTypeDTO contactTypeDTO) {
        log.debug("Request to save ContactType : {}", contactTypeDTO);
        ContactType contactType = contactTypeMapper.toEntity(contactTypeDTO);
        contactType = contactTypeRepository.save(contactType);
        return contactTypeMapper.toDto(contactType);
    }

    /**
     * Get all the contactTypes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ContactTypeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ContactTypes");
        return contactTypeRepository.findAll(pageable)
            .map(contactTypeMapper::toDto);
    }


    /**
     * Get one contactType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ContactTypeDTO> findOne(Long id) {
        log.debug("Request to get ContactType : {}", id);
        return contactTypeRepository.findById(id)
            .map(contactTypeMapper::toDto);
    }

    /**
     * Delete the contactType by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ContactType : {}", id);
        contactTypeRepository.deleteById(id);
    }
}
